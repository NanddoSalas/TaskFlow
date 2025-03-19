package com.taskflow.server.controllers;

import com.taskflow.server.dtos.ResponseDTO;
import com.taskflow.server.entities.User;
import com.taskflow.server.forms.CreateGroupForm;
import com.taskflow.server.forms.PatchGroupForm;
import com.taskflow.server.services.GroupService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/boards/{boardId}")
@AllArgsConstructor
public class GroupController {

    private GroupService groupService;

    @GetMapping("/groups")
    public ResponseEntity<ResponseDTO> retrieveGroups(@AuthenticationPrincipal User user, @PathVariable int boardId) throws Exception {
        return ResponseDTO.ok(groupService.retrieveGroups(user.getId(), boardId));
    }

    @PostMapping("/groups")
    public ResponseEntity<ResponseDTO> createGroup(@AuthenticationPrincipal User user, @PathVariable int boardId,
                                                   @Valid @RequestBody CreateGroupForm form) throws Exception {
        return ResponseDTO.ok(groupService.createGroup(user.getId(), boardId, form));
    }

    @PatchMapping("/groups/{groupId}")
    public ResponseEntity<ResponseDTO> updateGroup(@AuthenticationPrincipal User user, @PathVariable int boardId,
                                                   @Valid @RequestBody PatchGroupForm form,
                                                   @PathVariable int groupId) throws Exception {
        return ResponseDTO.ok(groupService.updateGroup(user.getId(), boardId, groupId, form));
    }

    @DeleteMapping("/groups/{groupId}")
    public ResponseEntity<ResponseDTO> deleteGroup(@AuthenticationPrincipal User user, @PathVariable int groupId,
                                                   @PathVariable int boardId) throws Exception {
        groupService.deleteGroup(user.getId(), boardId, groupId);
        return ResponseDTO.ok(null);
    }

}
