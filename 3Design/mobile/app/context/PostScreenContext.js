import React, { createContext, useState } from 'react';

export const PostScreenContext = createContext();

export function PostScreenProvider({ children }) {
  const [postScreen, setPostScreen] = useState(null);

  return (
    <PostScreenContext.Provider value={{ postScreen, setPostScreen }}>
      {children}
    </PostScreenContext.Provider>
  );
}
