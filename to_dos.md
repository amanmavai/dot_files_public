- [ ] task 1

```js

import React, { useState, useEffect, useRef } from 'react';
import { Box, Select } from '@chakra-ui/react';

const tabs = ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4', 'Tab 5', 'Tab 6', 'Tab 7', 'Tab 8', 'Tab 9', 'Tab 10'];

const ResponsiveTabs = () => {
  const [useDropdown, setUseDropdown] = useState(false);
  const containerRef = useRef(null);
  const tabsRef = useRef(null);

  useEffect(() => {
    const checkOverflow = () => {
      const containerWidth = containerRef.current.offsetWidth;
      const tabsWidth = tabsRef.current.scrollWidth;
      setUseDropdown(tabsWidth > containerWidth);
    };

    const resizeObserver = new ResizeObserver(checkOverflow);
    resizeObserver.observe(containerRef.current);
    checkOverflow();

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <Box display="flex" justifyContent="space-between" p={4} bg="gray.200" ref={containerRef}>
      <Box ref={tabsRef} display={useDropdown ? 'none' : 'flex'} flexWrap="nowrap" overflow="hidden" className="tabs">
        {tabs.map((tab, index) => (
          <Box key={index} flexShrink={0} mr={4} className="tab">
            {tab}
          </Box>
        ))}
      </Box>
      <Box display={useDropdown ? 'block' : 'none'} className="dropdown">
        <Select>
          {tabs.map((tab, index) => (
            <option key={index} value={tab}>
              {tab}
            </option>
          ))}
        </Select>
      </Box>
      <Box className="content-right">Other Content</Box>
    </Box>
  );
};

export default ResponsiveTabs;


```

```jsx
import type { BoxProps } from '@chakra-ui/react';
import { Box, Button, Text } from '@chakra-ui/react';
import React, { forwardRef, useState, useEffect, useRef } from 'react';

interface Props extends BoxProps {
  children: React.ReactNode;
  noOfLines: number;
}

export const ExpandableText = forwardRef<HTMLDivElement, Props>(
  ({ children, noOfLines, ...rest }, ref) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isTextClamped, setIsTextClamped] = useState(false);
    const inputRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (inputRef.current) {
        const isClamped =
          inputRef.current.scrollHeight > inputRef.current.clientHeight;
        setIsTextClamped(isClamped);
      }
    }, [isExpanded, children, noOfLines]);

    const handleToggle = () => {
      setIsExpanded(!isExpanded);
    };

    return (
      <Box ref={ref} {...rest}>
        <Box
          ref={inputRef}
          noOfLines={!isExpanded ? noOfLines : undefined}
          overflow="hidden"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: !isExpanded ? noOfLines : 'unset',
            WebkitBoxOrient: 'vertical',
          }}
        >
          {children}
        </Box>
        {isTextClamped && (
          <Button size="sm" variant="link" onClick={handleToggle}>
            <Text>{isExpanded ? 'Show less' : 'Read more'}</Text>
          </Button>
        )}
      </Box>
    );
  }
);

ExpandableText.displayName = 'ExpandableText';

```
