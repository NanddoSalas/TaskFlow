package com.taskflow.server.dtos;

import lombok.Data;
import org.springframework.http.ResponseEntity;

@Data
public class ResponseDTO {

    private Object data;
    private Object errors;

    public static ResponseEntity<ResponseDTO> ok(Object data) {
        ResponseDTO responseDTO = new ResponseDTO();

        responseDTO.setData(data);

        return ResponseEntity.ok(responseDTO);
    }

    public static ResponseEntity<ResponseDTO> badRequest(Object data) {
        ResponseDTO responseDTO = new ResponseDTO();

        responseDTO.setErrors(data);

        return ResponseEntity.badRequest().body(responseDTO);

    }

}
