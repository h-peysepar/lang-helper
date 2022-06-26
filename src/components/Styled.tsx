import { ElementType, FC, forwardRef, memo, ReactNode, ReactText } from 'react';

type CpProps = {
  children: ReactNode | ReactText;
  className: string;
  others?: object;
};

const Styled = function (Element: ElementType) {
  return function ([styles]: TemplateStringsArray): FC<CpProps> {
    return memo(
      forwardRef(function ({ children, className, ...props }, ref) {
        const classes = `${styles?.split('\n').join(' ').trim()} ${className}`;
        if (!children) {
          return <Element className={classes} {...{ ...props, ref }} />;
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
