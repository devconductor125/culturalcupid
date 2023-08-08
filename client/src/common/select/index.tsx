import React from 'react';
import { Cascader } from 'antd';

export type StyledSelectProps = {
  label: string;
  value: string;
  id: string;
  subCategoryId: string | null;
};

export interface StyledSelectArrayProps {
  list: Array<StyledSelectProps>;
  onChange: any;
  value?: any;
  placeholder?: string;
}

const buildTree: any = (
  list: Array<StyledSelectProps>,
  parentId: string | null = null
) => {
  return list
    .filter((item) => item.subCategoryId === parentId)
    .map((item) => ({
      value: item.value,
      label: item.label,
      id: item.id,
      children: buildTree(list, item.id),
    }));
};

const SimpleSelect = ({
  list,
  onChange,
  value,
  placeholder,
}: StyledSelectArrayProps) => {
  const options = React.useMemo(() => buildTree(list), [list]);
  return (
    <Cascader
      options={options}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      dropdownStyle={{ zIndex: 2000 }}
      style={{
        width: '200px',
        margin: '0px 10px',
        border: '2px solid black',
        borderRadius: '8px',
        zIndex: 9999,
      }}
    />
  );
};

export default SimpleSelect;
