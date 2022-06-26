import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { ElementType, FC, forwardRef, HTMLAttributes, memo } from 'react';

type CpProps = {
  className: string,
  props: object
};

const Styled = function (Element: ElementType) {
  return function ([styles]: TemplateStringsArray): FC {
    return memo(
      forwardRef(function ({ children, className, ...props }: any , ref) {
        const classes = `${styles?.split('\n').join(' ').trim()} ${className}`;
        if(!children){
          return <Element className={classes} {...{ ...props, ref }} />
        }
        return (
          <Element className={classes} {...{ ...props, ref }}>
            {children || ''}
          </Element>
        );
      })
    );
  };
};
export default Styled;
