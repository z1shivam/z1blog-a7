"use client";

import React, { useCallback, useMemo, forwardRef, useImperativeHandle, useRef } from "react";
import dynamic from 'next/dynamic';
import "easymde/dist/easymde.min.css";

const SimpleMdeReact = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const EditorComponent = forwardRef((props, ref) => {
  const valueRef = useRef("");

  const onChange = useCallback((value: string) => {
    valueRef.current = value;
  }, []);

  const autofocusNoSpellcheckerOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: true,
    };
  }, []);

  useImperativeHandle(ref, () => ({
    getValue: () => valueRef.current,
    setValue: (newValue: string) => {
      valueRef.current = newValue;
      if (editorInstanceRef.current) {
        // TypeScript fix: ensure correct type
        (editorInstanceRef.current as any).value(newValue);
      }
    },
  }));

  const editorInstanceRef = useRef<any>(null); 

  const handleEditorInstance = (instance: any) => {
    editorInstanceRef.current = instance;
    if (valueRef.current) {
      instance.value(valueRef.current);
    }
  };

  return (
    <SimpleMdeReact
      options={autofocusNoSpellcheckerOptions}
      value={valueRef.current}
      onChange={onChange}
      getMdeInstance={handleEditorInstance}
      placeholder="Write something here..."
    />
  );
});

export default EditorComponent;
