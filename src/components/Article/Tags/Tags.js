/* eslint-disable indent */
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './Tags.scss';

function Tag({ tag, last, handleClickAdd, handleClickDelete, register }) {
  return (
    <div className="tag">
      <input defaultValue={tag.content} {...register(`tagList.${tag.key}`, { shouldUnregister: true })} />
      <button className="button__delete" type="button" onClick={() => handleClickDelete(tag.key)}>
        Delete
      </button>
      {last ? (
        <button className="button__add" type="button" onClick={handleClickAdd}>
          Add tag
        </button>
      ) : null}
    </div>
  );
}

function Tags({ register, unregister, tagList }) {
  const tagContent = tagList
    ? tagList.map((tagItem) => {
        return { content: tagItem, key: uuidv4() };
      })
    : [{ content: '', key: uuidv4() }];
  const [tagsDict, setTagsDict] = useState(tagContent);
  const handleClickAdd = () => {
    setTagsDict(() => [...tagsDict, { content: '', key: uuidv4() }]);
  };
  const handleClickDelete = (key) => {
    if (tagsDict.length > 1) {
      unregister(`tagList.${key}`);
      const newTags = tagsDict.filter((item) => item.key !== key);
      setTagsDict(() => newTags);
    }
  };
  const tags = tagsDict.map((tag, ind) => {
    const last = ind + 1 === tagsDict.length;
    return (
      <Tag
        key={tag.key}
        tag={tag}
        last={last}
        setTagsDict={setTagsDict}
        handleClickAdd={handleClickAdd}
        handleClickDelete={handleClickDelete}
        register={register}
      />
    );
  });
  return <div className="tags">{tags}</div>;
}

export default Tags;
