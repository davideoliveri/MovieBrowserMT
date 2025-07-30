import { useEffect } from 'react';

export const PageTitle = (props: { children?: string }) => {
  useEffect(() => {
    if (props.children) {
      document.title = props.children;
    }
  }, [props.children]);

  return null;
};
