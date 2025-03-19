package com.taskflow.server.services;

import com.taskflow.server.dtos.GroupDTO;
import com.taskflow.server.entities.Group;
import com.taskflow.server.forms.CreateGroupForm;
import com.taskflow.server.forms.PatchGroupForm;
import com.taskflow.server.repositories.BoardRepository;
import com.taskflow.server.repositories.GroupRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class GroupService {

    private final GroupRepository groupRepository;
    private final BoardRepository boardRepository;

    public List<GroupDTO> retrieveGroups(int userId, int boardId) throws Exception {
        boardRepository.findByIdAndOwnerId(boardId, userId).orElseThrow(() -> new Exception("Board doesn't exist"));

        return groupRepository.findAllByBoardId(boardId).stream().map(Group::toDTO).toList();
    }

    public GroupDTO createGroup(int userId, int boardId, CreateGroupForm form) throws Exception {
        boardRepository.findByIdAndOwnerId(boardId, userId).orElseThrow(() -> new Exception("Board doesn't exist"));

        Group group = new Group();

        group.setName(form.getName());
        group.setBoardId(boardId);

        Optional<Group> groupOptional = groupRepository.findFirstByOrderByPositionDesc();

        if (groupOptional.isPresent()) {
            long newPosition = groupOptional.get().getPosition() + 10000;
            group.setPosition(newPosition);
        } else {
            group.setPosition(0);
        }

        return groupRepository.save(group).toDTO();
    }

    public GroupDTO updateGroup(int userId, int boardId, int groupId, PatchGroupForm form) throws Exception {
        boardRepository.findByIdAndOwnerId(boardId, userId).orElseThrow(() -> new Exception("Board doesn't exist"));
        Group group = groupRepository.findByIdAndBoardId(groupId, boardId).orElseThrow((() -> new Exception("Board doesn't exist")));

        if (form.getName() != null) {
            group.setName(form.getName());
        }

        if (form.getPosition() != null) {
            group.setPosition(form.getPosition());
        }

        return groupRepository.save(group).toDTO();
    }

    @Transactional
    public void deleteGroup(int userId, int boardId, int groupId) throws Exception {
        boardRepository.findByIdAndOwnerId(boardId, userId).orElseThrow(() -> new Exception("Board doesn't exist"));

        groupRepository.deleteByIdAndBoardId(groupId, boardId);
    }

}
