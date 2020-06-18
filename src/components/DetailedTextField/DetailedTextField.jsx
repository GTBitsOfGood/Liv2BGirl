import React from "react";
import PropTypes from "prop-types";
import { Editor, createEditor, Range, Transforms, Node } from "slate";
import { Editable, Slate, withReact, ReactEditor } from "slate-react";
import { withHistory } from "slate-history";
import boldIcon from "@iconify/icons-bx/bx-bold";
import italicIcon from "@iconify/icons-bx/bx-italic";
import underlineIcon from "@iconify/icons-bx/bx-underline";
import codeIcon from "@iconify/icons-bx/bx-code-block";
import headingH1Icon from "@iconify/icons-gridicons/heading-h1";
import headingH2Icon from "@iconify/icons-gridicons/heading-h2";
import quoteIcon from "@iconify/icons-bx/bxs-quote-left";
import orderListIcon from "@iconify/icons-bx/bx-list-ol";
import bulletListIcon from "@iconify/icons-bx/bx-list-ul";
import isHotkey from "is-hotkey";
import Toolbar from "./components/Toolbar";
import Elements from "./elements";
import Leafs from "./leafs";
import BlockButton from "./components/BlockButton";
import MarkButton from "./components/MarkButton";
import MentionModal from "./components/MentionModal";
import { HOTKEYS, toggleMark, withMentions, insertMention } from "./utils";
import classes from "./DetailedTextField.module.scss";

const initialNodes = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

const DetailedTextField = ({
  textNodes = initialNodes,
  readOnly,
  onChange,
  users,
}) => {
  const ref = React.useRef(null);
  const [value, setValue] = React.useState(textNodes ?? initialNodes);
  const [target, setTarget] = React.useState(null);
  const [index, setIndex] = React.useState(0);
  const [search, setSearch] = React.useState("");
  const renderElement = React.useCallback(
    (props) => <Elements {...props} />,
    []
  );
  const renderLeaf = React.useCallback((props) => <Leafs {...props} />, []);
  const editor = React.useMemo(
    () => withHistory(withMentions(withReact(createEditor()))),
    []
  );

  const handleKeyDown = (event) => {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event)) {
        event.preventDefault();

        const mark = HOTKEYS[hotkey];
        toggleMark(editor, mark);
      }
    }

    if (target) {
      switch (event.key) {
        case "ArrowDown": {
          event.preventDefault();

          const prevIndex = index >= users.length - 1 ? 0 : index + 1;
          setIndex(prevIndex);

          break;
        }
        case "ArrowUp": {
          event.preventDefault();

          const nextIndex = index <= 0 ? users.length - 1 : index - 1;
          setIndex(nextIndex);

          break;
        }
        case "Tab":
        case "Enter": {
          event.preventDefault();

          Transforms.select(editor, target);
          insertMention(editor, users[index]);
          setTarget(null);

          break;
        }
        case "Escape": {
          event.preventDefault();

          setTarget(null);

          break;
        }
      }
    }
  };

  const handleChange = async (value) => {
    setValue(value);

    try {
      const parsedText = JSON.stringify(value);

      const currentMentions = [];
      for (const node of value) {
        for (const entry of Node.descendants(node)) {
          if (entry[0]?.type === "mention") {
            currentMentions.push(entry[0].user._id);
          }
        }
      }

      onChange({
        nodes: parsedText,
        mentions: currentMentions,
      });
    } catch (e) {
      console.error("Failed to convert textNodes to text!");
    }

    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const [start] = Range.edges(selection);
      const wordBefore = Editor.before(editor, start, { unit: "word" });
      const before = wordBefore && Editor.before(editor, wordBefore);
      const beforeRange = before && Editor.range(editor, before, start);
      const beforeText = beforeRange && Editor.string(editor, beforeRange);
      const beforeMatch = beforeText && beforeText.match(/^@(\w+)$/);
      const after = Editor.after(editor, start);
      const afterRange = Editor.range(editor, start, after);
      const afterText = Editor.string(editor, afterRange);
      const afterMatch = afterText.match(/^(\s|$)/);

      if (beforeMatch && afterMatch) {
        setTarget(beforeRange);
        setSearch(beforeMatch[1]);
        setIndex(0);
        return;
      }
    }

    setTarget(null);
  };

  React.useEffect(() => {
    if (target && users.length > 0) {
      const el = ref.current;
      const domRange = ReactEditor.toDOMRange(editor, target);
      const rect = domRange.getBoundingClientRect();

      el.style.top = `${rect.top + window.pageYOffset + 24}px`;
      el.style.left = `${rect.left + window.pageXOffset}px`;
    }
  }, [users.length, editor, index, search, target]);

  return (
    <div className={classes.root} onClick={() => ReactEditor.focus(editor)}>
      <Slate editor={editor} value={value} onChange={handleChange}>
        <div className={classes.textArea}>
          <Editable
            readOnly={readOnly}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            spellCheck={!readOnly}
            placeholder={readOnly ? "" : "Text"}
            onKeyDown={handleKeyDown}
          />
        </div>
        {!readOnly && ReactEditor.isFocused(editor) && (
          <Toolbar>
            <MarkButton format="bold" icon={boldIcon} />
            <MarkButton format="italic" icon={italicIcon} />
            <MarkButton format="underline" icon={underlineIcon} />
            <MarkButton format="code" icon={codeIcon} />
            <BlockButton format="heading-one" icon={headingH1Icon} />
            <BlockButton format="heading-two" icon={headingH2Icon} />
            <BlockButton format="block-quote" icon={quoteIcon} />
            <BlockButton format="numbered-list" icon={orderListIcon} />
            <BlockButton format="bulleted-list" icon={bulletListIcon} />
          </Toolbar>
        )}
        {!readOnly && target && users.length > 0 && (
          <MentionModal ref={ref} users={users} index={index} />
        )}
      </Slate>
    </div>
  );
};

DetailedTextField.propTypes = {
  textNodes: PropTypes.arrayOf(PropTypes.any),
  readOnly: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    })
  ),
};

DetailedTextField.defaultProps = {
  textNodes: initialNodes,
  users: [],
};

export default DetailedTextField;
