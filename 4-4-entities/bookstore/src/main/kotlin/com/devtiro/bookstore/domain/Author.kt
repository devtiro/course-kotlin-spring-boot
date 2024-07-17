package com.devtiro.bookstore.domain

import jakarta.persistence.*

@Entity
@Table(name="authors")
data class Author(
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "author_id_seq")
    val id: Long?,

    @Column(name="name")
    val name: String,

    @Column(name="age")
    val age: Int,

    @Column(name="description")
    val description: String,

    @Column(name="image")
    val image: String
)