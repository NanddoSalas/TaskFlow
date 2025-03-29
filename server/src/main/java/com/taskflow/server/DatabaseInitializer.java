package com.taskflow.server;

import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.nio.file.Files;
import java.nio.file.Paths;

@Component
public class DatabaseInitializer {
  private final JdbcTemplate jdbcTemplate;

  public DatabaseInitializer(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
    loadSqlScript();
  }

  private void loadSqlScript() {
    try {
      String sql = new String(Files.readAllBytes(Paths.get(new ClassPathResource("schema.sql").getURI())));
      jdbcTemplate.execute(sql);
    } catch (Exception e) {
      throw new RuntimeException("Failed to load schema.sql", e);
    }
  }
}
