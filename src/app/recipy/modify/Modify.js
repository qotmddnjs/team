'use client';
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Box, TextField, Button, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import useArticlesStatus from '../RecipyStatus';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Modify = ({ noticeSnackbarStatus }) => {
  const articlesStatus = useArticlesStatus();
  const { id } = useParams();
  const numericId = parseInt(id, 10);
  const navigate = useNavigate();

  const article = articlesStatus.findArticleById(numericId);

  const [boardId, setBoardId] = useState(article.boardId); // 기존의 boardId로 초기화
  const [title, setTitle] = useState(article.title); // 기존의 제목으로 초기화
  const [content, setContent] = useState(article.content); // 기존의 내용으로 초기화

  const boardChange = (event) => {
    setBoardId(event.target.value);
  };

  const titleChange = (event) => {
    setTitle(event.target.value);
  };

  const contentChange = (event) => {
    setContent(event.target.value);
  };

  //수정
  const modify = async (event) => {
    event.preventDefault();
    articlesStatus.articleModify(numericId, boardId, title, content);

    try {
      // 글 수정
      const response = await axios.post('/api/recipy/articleModify', {
        id: numericId,
        boardId: boardId,
        title: title,
        content: content,
      });

      // 성공 시 스낵바 메시지 표시
      noticeSnackbarStatus.open('글이 수정되었습니다.', 'success');
      navigate(`/recipy/detail/${article.id}`);
    } catch (error) {
      // 실패 시 스낵바 메시지 표시
      noticeSnackbarStatus.open('글 수정에 실패했습니다.', 'error');
    }
  };

  return (
    <>
      <div style={{ border: '2px solid red' }}>
        <form action="" onSubmit={modify}>
          <div
            style={{ border: '2px solid red' }}
            className="tw-flex tw-items-center tw-justify-around">
            <div>분류 :</div>
            <Box sx={{ minWidth: '70%' }}>
              <FormControl fullWidth disabled>
                <InputLabel id="boardId-label">게시판을 골라주세요</InputLabel>
                <Select
                  labelId="boardId-label"
                  id="boardId-select"
                  value={boardId}
                  onChange={boardChange}>
                  <MenuItem value={1}>회원레시피</MenuItem>
                  <MenuItem value={2}>자유게시판</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <div
            className="tw-flex tw-items-center tw-justify-around"
            style={{ border: '2px solid red' }}>
            <div>제목 :</div>{' '}
            <TextField name="title" sx={{ width: '70%' }} value={title} onChange={titleChange} />
          </div>

          <TextField
            style={{ width: '100%' }}
            minRows={20}
            maxRows={20}
            multiline
            name="content"
            autoComplete="off"
            label="내용을 입력해주세요"
            value={content}
            onChange={contentChange}
          />

          <div className="tw-flex tw-justify-around">
            <Button variant="contained">수정취소</Button>
            <Button type="submit" variant="contained">
              수정하기
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Modify;
