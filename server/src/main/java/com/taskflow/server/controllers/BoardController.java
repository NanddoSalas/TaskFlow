package com.taskflow.server.controllers;

import com.taskflow.server.dtos.ResponseDTO;
import com.taskflow.server.entities.User;
import com.taskflow.server.forms.BoardForm;
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
    public ResponseEntity<ResponseDTO> getAllBoards(@AuthenticationPrincipal User user) {
        return ResponseDTO.ok(boardService.getAllBoards(user.getId()));
    }

    @PostMapping("")
    public ResponseEntity<ResponseDTO> createBoard(@AuthenticationPrincipal User user, @Valid @RequestBody BoardForm form) {
        return ResponseDTO.ok(boardService.createBoard(form, user));
    }

    @DeleteMapping("{boardId}")
    public ResponseEntity<ResponseDTO> deleteBoard(@AuthenticationPrincipal User user, @PathVariable int boardId) {
        boardService.deleteBoard(boardId, user.getId());
        return ResponseDTO.ok(null);
    }

}
