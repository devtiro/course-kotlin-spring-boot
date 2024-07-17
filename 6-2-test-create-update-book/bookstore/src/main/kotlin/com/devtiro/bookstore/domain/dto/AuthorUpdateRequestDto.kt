package com.devtiro.bookstore.domain.dto

data class AuthorUpdateRequestDto(
    val id: Long?,
    val name: String?,
    val age: Int?,
    val description: String?,
    val image: String?
)