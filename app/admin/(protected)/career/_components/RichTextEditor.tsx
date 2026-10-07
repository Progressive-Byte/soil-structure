"use client";

import { useEffect } from "react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

type ToolbarButtonProps = {
  label: string;
  title: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
};

function ToolbarButton({
  label,
  title,
  active = false,
  disabled = false,
  onClick,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      aria-pressed={active}
      disabled={disabled}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className={`inline-flex h-9 min-w-9 items-center justify-center rounded-lg px-2.5 text-sm font-semibold text-ink transition-colors hover:bg-lime disabled:cursor-not-allowed disabled:opacity-40 ${
        active ? "bg-lime" : "bg-transparent"
      }`}
    >
      {label}
    </button>
  );
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      // Tiptap 3 includes Link in StarterKit. Disable it here because this
      // editor configures Link separately with the admin toolbar behavior.
      StarterKit.configure({
        link: false,
        heading: { levels: [2, 3] },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer nofollow",
        },
      }),
    ],
    content: value || "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        id: "job-description",
        "aria-label": "Job details",
        class: "min-h-[240px] outline-none",
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      onChange(currentEditor.getHTML());
    },
  });
  const editorUi = useEditorState({
    editor,
    selector: ({ editor: currentEditor }) => {
      if (!currentEditor) return null;

      return {
        bold: currentEditor.isActive("bold"),
        italic: currentEditor.isActive("italic"),
        heading2: currentEditor.isActive("heading", { level: 2 }),
        heading3: currentEditor.isActive("heading", { level: 3 }),
        bulletList: currentEditor.isActive("bulletList"),
        orderedList: currentEditor.isActive("orderedList"),
        blockquote: currentEditor.isActive("blockquote"),
        link: currentEditor.isActive("link"),
        canUndo: currentEditor.can().undo(),
        canRedo: currentEditor.can().redo(),
      };
    },
  });

  // Keep the editor in sync if its value is replaced externally (for example,
  // when an edit form loads another vacancy) without resetting the cursor on
  // each normal keystroke.
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [editor, value]);

  function setLink() {
    if (!editor) return;
    const currentHref = editor.getAttributes("link").href as string | undefined;
    const href = window.prompt("Enter a URL. Leave it blank to remove the link.", currentHref ?? "https://");
    if (href === null) return;

    if (!href.trim()) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    const normalizedHref = /^(https?:|mailto:|tel:)/i.test(href.trim())
      ? href.trim()
      : `https://${href.trim()}`;
    editor.chain().focus().extendMarkRange("link").setLink({ href: normalizedHref }).run();
  }

  return (
    <div className="w-full overflow-hidden rounded-xl border border-line bg-white shadow-sm transition focus-within:border-lime-700 focus-within:ring-2 focus-within:ring-lime-600/20">
      <div
        role="toolbar"
        aria-label="Job details formatting"
        className="flex flex-wrap items-center gap-1 border-b border-line bg-bone px-3 py-2"
      >
        <ToolbarButton
          label="B"
          title="Bold"
          active={editorUi?.bold}
          disabled={!editor}
          onClick={() => editor?.chain().focus().toggleBold().run()}
        />
        <ToolbarButton
          label="I"
          title="Italic"
          active={editorUi?.italic}
          disabled={!editor}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        />
        <span aria-hidden="true" className="mx-1 h-6 w-px bg-line" />
        <ToolbarButton
          label="H2"
          title="Heading 2"
          active={editorUi?.heading2}
          disabled={!editor}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
        />
        <ToolbarButton
          label="H3"
          title="Heading 3"
          active={editorUi?.heading3}
          disabled={!editor}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
        />
        <ToolbarButton
          label="• List"
          title="Bullet list"
          active={editorUi?.bulletList}
          disabled={!editor}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        />
        <ToolbarButton
          label="1. List"
          title="Numbered list"
          active={editorUi?.orderedList}
          disabled={!editor}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        />
        <ToolbarButton
          label="Quote"
          title="Block quote"
          active={editorUi?.blockquote}
          disabled={!editor}
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
        />
        <ToolbarButton
          label="Link"
          title="Add or remove link"
          active={editorUi?.link}
          disabled={!editor}
          onClick={setLink}
        />
        <span aria-hidden="true" className="mx-1 h-6 w-px bg-line" />
        <ToolbarButton
          label="↶"
          title="Undo"
          disabled={!editorUi?.canUndo}
          onClick={() => editor?.chain().focus().undo().run()}
        />
        <ToolbarButton
          label="↷"
          title="Redo"
          disabled={!editorUi?.canRedo}
          onClick={() => editor?.chain().focus().redo().run()}
        />
      </div>

      <EditorContent
        editor={editor}
        className="min-h-[260px] px-4 py-3 text-sm font-normal leading-7 tracking-normal text-ink normal-case sm:px-5 [&_.ProseMirror]:min-h-[240px] [&_.ProseMirror]:whitespace-normal [&_.ProseMirror]:font-normal [&_.ProseMirror]:focus:outline-none [&_.ProseMirror:focus-visible]:outline-none [&_.ProseMirror:focus-visible]:ring-0 [&_.ProseMirror:focus-visible]:ring-offset-0 [&_.ProseMirror_h2]:mb-3 [&_.ProseMirror_h2]:mt-5 [&_.ProseMirror_h2]:font-heading [&_.ProseMirror_h2]:text-xl [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h3]:mb-2 [&_.ProseMirror_h3]:mt-4 [&_.ProseMirror_h3]:font-heading [&_.ProseMirror_h3]:text-lg [&_.ProseMirror_h3]:font-bold [&_.ProseMirror_ul]:my-3 [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-6 [&_.ProseMirror_ol]:my-3 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-6 [&_.ProseMirror_li]:my-1 [&_.ProseMirror_blockquote]:my-4 [&_.ProseMirror_blockquote]:border-l-2 [&_.ProseMirror_blockquote]:border-lime-600 [&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:italic [&_.ProseMirror_a]:text-lime-700 [&_.ProseMirror_a]:underline [&_.ProseMirror_a]:underline-offset-2 [&_.ProseMirror_p]:my-2"
      />
    </div>
  );
}
