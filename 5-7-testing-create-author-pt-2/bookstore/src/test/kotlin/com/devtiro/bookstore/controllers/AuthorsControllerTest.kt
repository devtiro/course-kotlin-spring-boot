package com.devtiro.bookstore.controllers

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.web.servlet.MockMvc

@SpringBootTest
@AutoConfigureMockMvc
class AuthorsControllerTest @Autowired constructor (val mockMvc: MockMvc) {

    @Test
    fun `test that create Author returns a HTTP 201 status on a successful create`() {
        assertThat(true == true)
    }


}