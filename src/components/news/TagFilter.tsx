import React from 'react';
import { Tag } from '../../types';

interface TagFilterProps {
  tags: Tag[];
  selectedTags: string[];
  onTagChange: (tags: string[]) => void;
}

const TagFilter: React.FC<TagFilterProps> = ({
  tags,
  selectedTags,
  onTagChange
}) => {
  const handleTagClick = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      onTagChange(selectedTags.filter(t => t !== tagId));
    } else {
      onTagChange([...selectedTags, tagId]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map(tag => (
        <button
          key={tag.id}
          onClick={() => handleTagClick(tag.id)}
          className={`tag transition-all duration-200 ${
            selectedTags.includes(tag.id)
              ? 'ring-2 ring-primary-500 ring-offset-1'
              : ''
          } ${tag.color}`}
        >
          {tag.name}
        </button>
      ))}
    </div>
  );
};

export default TagFilter;
