import { observable } from 'mobx';
import React from 'react';

type ListProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
};

const List = <T,>(props: ListProps<T>) => {
  return <>{props.items.map(props.renderItem)}</>;
};

export default List;
