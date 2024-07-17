package com.devtiro.bookstore.domain.entities

import jakarta.persistence.*
import java.awt.print.Book

@Entity
@Table(name = "authors")
data class AuthorEntity(

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "author_id_seq")
    val id: Long?,

    @Column(name = "name")
    val name: String,

    @Column(name = "age")
    val age: Int,

    @Column(name = "description")
    val description: String,

    @Column(name = "image")
    val image: String,

    @OneToMany(mappedBy = "authorEntity", cascade = [CascadeType.REMOVE])
    val bookEntities: List<BookEntity> = emptyList(),
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as AuthorEntity

        if (id != other.id) return false
        if (name != other.name) return false
        if (age != other.age) return false
        if (description != other.description) return false
        if (image != other.image) return false
//        if (bookEntities != other.bookEntities) return false

        return true
    }

    override fun hashCode(): Int {
        var result = id?.hashCode() ?: 0
        result = 31 * result + name.hashCode()
        result = 31 * result + age
        result = 31 * result + description.hashCode()
        result = 31 * result + image.hashCode()
        result = 31 * result + bookEntities.hashCode()
        return result
    }
}