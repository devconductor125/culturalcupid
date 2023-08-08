import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../../api/category';
import { Cascader, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import Translate from '../../common/translate/Translate';

function constructNestedCategories(data: any[]) {
  const rootCategories = data.filter((item) => item.subCategoryId === null);
  const buildTree: any = (categories: any[]) => {
    return categories.map((category) => {
      const children = data.filter(
        (item) => item.subCategoryId === category.id
      );
      return {
        ...category,
        value: category.id,
        label: <Translate>{category.name}</Translate>,
        children: buildTree(children),
      };
    });
  };
  return buildTree(rootCategories);
}

const Categories = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery(['Categories'], () => getCategories(), {
    select: (data) => constructNestedCategories(data.data),
  });

  const onChange = (value: any, selectedOptions: any) => {
    navigate(`/category/${selectedOptions[selectedOptions.length - 1].value}`);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'start',
        margin: '20px 0px',
        zIndex: 999,
        position: 'relative',
      }}
    >
      {data &&
        data.map((category: any) => {
          if (category.children && category.children.length > 0) {
            return (
              <Cascader
                key={category.id}
                options={[category]}
                onChange={onChange}
                style={{ margin: '0px 5px' }}
              >
                <Button
                  type="link"
                  style={{
                    color: 'green',
                    fontSize: '20px',
                    fontWeight: 'bold',
                  }}
                >
                  <Translate>{category.label}</Translate>
                </Button>
              </Cascader>
            );
          } else {
            return (
              <Button
                key={category.id}
                type="link"
                style={{
                  color: 'green',
                  margin: '0px 5px',
                  fontSize: '20px',
                  fontWeight: 'bold',
                }}
                onClick={() => navigate(`/category/${category.value}`)}
              >
                <Translate>{category.label}</Translate>
              </Button>
            );
          }
        })}
    </div>
  );
};

export default Categories;
