import {
  ElementType,
  forwardRef,
  HTMLAttributes,
  memo,
  ReactNode,
  ReactText,
} from 'react';

const Styled = function <T = HTMLElement>(Element: ElementType) {
  return function ([styles]: TemplateStringsArray) {
    const Styled = memo(
      forwardRef(function (
        { children, className, ...props }: HTMLAttributes<T>,
        ref
      ) {
        const classes = `${styles?.split('\n').join(' ').trim()} ${
          className || ''
        }`;
        if (children === undefined) {
          return <Element className={classes} {...{ ...props, ref }} />;
        }
        return (
          <Element className={classes} {...{ ...props, ref }}>
            {children === undefined ? '' : children}
          </Element>
        );
      })
    );
    Styled.displayName = `Styled${Element}`
    return Styled;
  };
};
export default Styled;
