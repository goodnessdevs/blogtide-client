"use client";

import { EditorContent, useEditor, useEditorState, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading2,
  Heading3,
  ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  Quote,
  Redo2,
  Strikethrough,
  Underline as UnderlineIcon,
  Undo2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface PostEditorProps {
  value: string;
  onChange: (html: string) => void;
  invalid?: boolean;
  placeholder?: string;
}

export function PostEditor({ value, onChange, invalid, placeholder = "Tell your story…" }: PostEditorProps) {
  const editor = useEditor({
    // Required for Next.js SSR: render on the client only, after hydration.
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: { openOnClick: false, autolink: true, defaultProtocol: "https" },
      }),
      Image.configure({ inline: false, allowBase64: false }),
      Placeholder.configure({ placeholder }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "prose prose-neutral dark:prose-invert prose-headings:font-heading max-w-none min-h-[320px] px-4 py-3 outline-none focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.isEmpty ? "" : editor.getHTML()),
  });

  return (
    <div
      className={cn(
        "rounded-lg border bg-background transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
        invalid && "border-destructive ring-3 ring-destructive/20",
      )}
    >
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

function Toolbar({ editor }: { editor: Editor | null }) {
  // Subscribe only to the bits the toolbar highlights, so typing does not
  // re-render the whole form on every keystroke.
  const state = useEditorState({
    editor,
    selector: ({ editor }) => {
      if (!editor) return null;
      return {
        bold: editor.isActive("bold"),
        italic: editor.isActive("italic"),
        underline: editor.isActive("underline"),
        strike: editor.isActive("strike"),
        code: editor.isActive("code"),
        h2: editor.isActive("heading", { level: 2 }),
        h3: editor.isActive("heading", { level: 3 }),
        bullet: editor.isActive("bulletList"),
        ordered: editor.isActive("orderedList"),
        quote: editor.isActive("blockquote"),
        link: editor.isActive("link"),
        left: editor.isActive({ textAlign: "left" }),
        center: editor.isActive({ textAlign: "center" }),
        right: editor.isActive({ textAlign: "right" }),
        canUndo: editor.can().undo(),
        canRedo: editor.can().redo(),
      };
    },
  });

  if (!editor || !state) {
    return <div className="h-11 border-b" />;
  }

  const setLink = () => {
    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL", previous ?? "https://");
    if (url === null) return;
    if (url.trim() === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
  };

  const addImage = () => {
    const url = window.prompt("Image URL (https://…)");
    if (!url || !/^https?:\/\//.test(url.trim())) return;
    editor.chain().focus().setImage({ src: url.trim() }).run();
  };

  const items: Array<
    | { type: "sep" }
    | { type: "btn"; label: string; icon: React.ReactNode; active?: boolean; disabled?: boolean; run: () => void }
  > = [
    { type: "btn", label: "Undo", icon: <Undo2 />, disabled: !state.canUndo, run: () => editor.chain().focus().undo().run() },
    { type: "btn", label: "Redo", icon: <Redo2 />, disabled: !state.canRedo, run: () => editor.chain().focus().redo().run() },
    { type: "sep" },
    { type: "btn", label: "Heading", icon: <Heading2 />, active: state.h2, run: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
    { type: "btn", label: "Subheading", icon: <Heading3 />, active: state.h3, run: () => editor.chain().focus().toggleHeading({ level: 3 }).run() },
    { type: "sep" },
    { type: "btn", label: "Bold", icon: <Bold />, active: state.bold, run: () => editor.chain().focus().toggleBold().run() },
    { type: "btn", label: "Italic", icon: <Italic />, active: state.italic, run: () => editor.chain().focus().toggleItalic().run() },
    { type: "btn", label: "Underline", icon: <UnderlineIcon />, active: state.underline, run: () => editor.chain().focus().toggleUnderline().run() },
    { type: "btn", label: "Strikethrough", icon: <Strikethrough />, active: state.strike, run: () => editor.chain().focus().toggleStrike().run() },
    { type: "btn", label: "Inline code", icon: <Code />, active: state.code, run: () => editor.chain().focus().toggleCode().run() },
    { type: "sep" },
    { type: "btn", label: "Bullet list", icon: <List />, active: state.bullet, run: () => editor.chain().focus().toggleBulletList().run() },
    { type: "btn", label: "Numbered list", icon: <ListOrdered />, active: state.ordered, run: () => editor.chain().focus().toggleOrderedList().run() },
    { type: "btn", label: "Quote", icon: <Quote />, active: state.quote, run: () => editor.chain().focus().toggleBlockquote().run() },
    { type: "sep" },
    { type: "btn", label: "Align left", icon: <AlignLeft />, active: state.left, run: () => editor.chain().focus().setTextAlign("left").run() },
    { type: "btn", label: "Align center", icon: <AlignCenter />, active: state.center, run: () => editor.chain().focus().setTextAlign("center").run() },
    { type: "btn", label: "Align right", icon: <AlignRight />, active: state.right, run: () => editor.chain().focus().setTextAlign("right").run() },
    { type: "sep" },
    { type: "btn", label: "Link", icon: <Link2 />, active: state.link, run: setLink },
    { type: "btn", label: "Image from URL", icon: <ImageIcon />, run: addImage },
  ];

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b p-1.5">
      {items.map((item, i) =>
        item.type === "sep" ? (
          <Separator key={i} orientation="vertical" className="mx-1 h-5!" />
        ) : (
          <Tooltip key={item.label}>
            <TooltipTrigger
              render={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label={item.label}
                  aria-pressed={item.active}
                  disabled={item.disabled}
                  onClick={item.run}
                  className={cn(item.active && "bg-muted text-foreground")}
                />
              }
            >
              {item.icon}
            </TooltipTrigger>
            <TooltipContent>{item.label}</TooltipContent>
          </Tooltip>
        ),
      )}
    </div>
  );
}
