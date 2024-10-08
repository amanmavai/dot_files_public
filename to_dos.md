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

```sh
#!/bin/sh
# Fetch all branches and tags
git fetch origin +refs/heads/*:refs/remotes/origin/*

# Determine the common ancestor between the main branch and the current branch
BASE_COMMIT=$(git merge-base origin/main HEAD)

# Run nx affected:build
npx nx affected:build --base=$BASE_COMMIT --head=HEAD

# Optionally, you can also add other nx affected commands like test or lint
# npx nx affected:test --base=$BASE_COMMIT --head=HEAD
# npx nx affected:lint --base=$BASE_COMMIT --head=HEAD


#
chmod +x scripts/pre-push.sh

```

```jsx
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // Get the value from localStorage or use the initial value if not available
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn('Error reading localStorage', error);
      return initialValue;
    }
  });

  // Save the new value in both the state and localStorage
  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn('Error setting localStorage', error);
    }
  };

  // Effect to keep state and localStorage in sync when the key changes
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const newValue = localStorage.getItem(key);
        setStoredValue(newValue ? JSON.parse(newValue) : initialValue);
      } catch (error) {
        console.warn('Error syncing with localStorage', error);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, initialValue]);

  return [storedValue, setValue];
}

export default useLocalStorage;

```

https://codesandbox.io/p/sandbox/divine-snow-9q559t?file=%2Fsrc%2FCalendarGrid.js%3A9%2C47
