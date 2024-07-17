package com.devtiro.bookstore.domain

data class Book(var isbn: String, var title: String, var description: String, var image: String, var author: Author)