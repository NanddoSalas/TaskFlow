package com.taskflow.server.services;

import com.taskflow.server.dtos.BoardDTO;
import com.taskflow.server.entities.Board;
import com.taskflow.server.entities.User;
import com.taskflow.server.forms.BoardForm;
import com.taskflow.server.repositories.BoardRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;

    public List<BoardDTO> getAllBoards(int userId) {
        List<Board> boards = boardRepository.findAllByOwnerId(userId);

        return boards.stream().map(Board::toDTO).toList();
    }

    public BoardDTO createBoard(BoardForm form, User user) {
        Board board = new Board();

        board.setName(form.getName());
        board.setOwner(user);

        return boardRepository.save(board).toDTO();
    }

    @Transactional
    public void deleteBoard(int boardId, int userId) {
        boardRepository.deleteBoardByIdAndOwnerId(boardId, userId);
    }
}
