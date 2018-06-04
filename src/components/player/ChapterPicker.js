/* eslint react/no-array-index-key: 0 */
import React from 'react';
import { Picker } from 'react-native';
import { ChapterPickerTextColor } from '../styles/Colors';

const ChapterPicker = ({ chapters, chapterIdx, goToChapter }) => (
  <Picker
    selectedValue={chapterIdx}
    style={{
      height: 50,
      width: '95%',
      color: ChapterPickerTextColor,
    }}
    onValueChange={itemValue => goToChapter(itemValue)}
  >
    {chapters.map((chapter, idx) => (
      <Picker.Item key={idx} label={chapter.get('title')} value={idx} />
    ))}
  </Picker>
);
export default ChapterPicker;
