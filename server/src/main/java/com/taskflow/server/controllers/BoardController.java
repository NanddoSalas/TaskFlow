package com.taskflow.server.controllers;

import com.taskflow.server.dtos.ResponseDTO;
import com.taskflow.server.entities.User;
import com.taskflow.server.forms.CreateBoardForm;
import com.taskflow.server.forms.PatchBoardForm;
import com.taskflow.server.services.BoardService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/boards")
@AllArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @GetMapping("")
    public ResponseEntity<ResponseDTO> retrieveBoards(@AuthenticationPrincipal User user) {
        return ResponseDTO.ok(boardService.retrieveBoards(user.getId()));
    }

    @PostMapping("")
    public ResponseEntity<ResponseDTO> createBoard(@AuthenticationPrincipal User user,
                                                   @Valid @RequestBody CreateBoardForm form) {
        return ResponseDTO.ok(boardService.createBoard(user.getId(), form));
    }

    @PatchMapping("{boardId}")
    public ResponseEntity<ResponseDTO> updateBoard(@AuthenticationPrincipal User user, @PathVariable int boardId,
                                                   @Valid @RequestBody PatchBoardForm form) throws Exception {
        return ResponseDTO.ok(boardService.updateBoard(user.getId(), boardId, form));
    }

    @DeleteMapping("{boardId}")
    public ResponseEntity<ResponseDTO> deleteBoard(@AuthenticationPrincipal User user, @PathVariable int boardId) throws Exception {
        boardService.deleteBoard(user.getId(), boardId);
        return ResponseDTO.ok(null);
    }

}
