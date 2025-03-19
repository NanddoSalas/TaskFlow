package com.taskflow.server.services;

import com.taskflow.server.dtos.BoardDTO;
import com.taskflow.server.entities.Board;
import com.taskflow.server.forms.CreateBoardForm;
import com.taskflow.server.forms.PatchBoardForm;
import com.taskflow.server.repositories.BoardRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;

    public List<BoardDTO> retrieveBoards(int userId) {
        List<Board> boards = boardRepository.findAllByOwnerId(userId);

        return boards.stream().map(Board::toDTO).toList();
    }

    public BoardDTO createBoard(int userId, CreateBoardForm form) {
        Board board = new Board();

        board.setName(form.getName());
        board.setOwnerId(userId);

        return boardRepository.save(board).toDTO();
    }

    public BoardDTO updateBoard(int userId, int boardId, PatchBoardForm form) throws Exception {
        Board board = boardRepository.findByIdAndOwnerId(boardId, userId).orElseThrow(() -> new Exception("Board doesn't exist"));

        if (form.getName() != null) {
            board.setName(form.getName());
        }

        return boardRepository.save(board).toDTO();
    }

    @Transactional
    public void deleteBoard(int userId, int boardId) throws Exception {
        boardRepository.findByIdAndOwnerId(boardId, userId).orElseThrow(() -> new Exception("Board doesn't exist"));

        boardRepository.deleteById(boardId);
    }
}
