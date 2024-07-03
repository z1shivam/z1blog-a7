"use client";

import React, { useCallback, useMemo, useState } from "react";
import dynamic from 'next/dynamic';
import "easymde/dist/easymde.min.css";

// Dynamically import SimpleMdeReact
const SimpleMdeReact = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const EditorComponent = () => {
  const [value, setValue] = useState("Initial");

  const onChange = useCallback((value: string) => {
    setValue(value);
  }, []);

  const autofocusNoSpellcheckerOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: true,
    };
  }, []);

  return (
    <SimpleMdeReact
      options={autofocusNoSpellcheckerOptions}
      value={value}
      onChange={onChange}
    />
  );
};

export default EditorComponent;
