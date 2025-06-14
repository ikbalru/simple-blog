'use client';

import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';

import MenuBar from './menuBar';

interface TextEditorProps {
  onChange: (content: string) => void;
  initialContent?: string;
  disabled?: boolean;
}

const TextEditor = ({
  onChange,
  initialContent = '',
  disabled = false,
}: TextEditorProps) => {
  const editor = useEditor({
    onUpdate: ({ editor }) => {
      // Get HTML content and pass it to the parent component through onChange
      const html = editor.getHTML();
      onChange(html);
    },
    extensions: [
      Image,
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc ml-3',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal ml-3',
          },
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
        isAllowedUri: (url, ctx) => {
          try {
            // construct URL
            const parsedUrl = url.includes(':')
              ? new URL(url)
              : new URL(`${ctx.defaultProtocol}://${url}`);

            // use default validation
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false;
            }

            // disallowed protocols
            const disallowedProtocols = ['ftp', 'file', 'mailto'];
            const protocol = parsedUrl.protocol.replace(':', '');

            if (disallowedProtocols.includes(protocol)) {
              return false;
            }

            // only allow protocols specified in ctx.protocols
            const allowedProtocols = ctx.protocols.map((p) =>
              typeof p === 'string' ? p : p.scheme
            );

            if (!allowedProtocols.includes(protocol)) {
              return false;
            }

            // disallowed domains
            const disallowedDomains = [
              'example-phishing.com',
              'malicious-site.net',
            ];
            const domain = parsedUrl.hostname;

            if (disallowedDomains.includes(domain)) {
              return false;
            }

            // all checks have passed
            return true;
          } catch {
            return false;
          }
        },
        shouldAutoLink: (url) => {
          try {
            // construct URL
            const parsedUrl = url.includes(':')
              ? new URL(url)
              : new URL(`https://${url}`);

            // only auto-link if the domain is not in the disallowed list
            const disallowedDomains = [
              'example-no-autolink.com',
              'another-no-autolink.com',
            ];
            const domain = parsedUrl.hostname;

            return !disallowedDomains.includes(domain);
          } catch {
            return false;
          }
        },
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class:
          'min-h-59.5 py-3 px-4 [&_h1]:display-sm-bold [&_h2]:display-xs-bold [&_h3]:text-lg-bold [&_a]:cursor-pointer [&_a]:text-purple-500 [&_a]:hover:text-purple-300 [&_a]:underline [&_a]:underline-offset-2',
      },
    },
  });

  // Effect to update editor content when initialContent changes
  useEffect(() => {
    // Only update if editor exists and initialContent has value
    if (editor && initialContent && editor.getHTML() !== initialContent) {
      // Set editor content from initialContent prop
      editor.commands.setContent(initialContent);
    }
  }, [editor, initialContent]);

  return (
    <div className='rounded-xl border border-neutral-300'>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} disabled={disabled} />
    </div>
  );
};

export default TextEditor;
