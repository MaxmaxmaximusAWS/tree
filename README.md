Tree
===

Компонент лежит в `/src/components/Tree`

Я вначале нормализую данные приходящие с бэкенда в удобный формат,
то есть заранее узнаю кто кому ребёнок, кто родитель, чтобы потом 
при рендере не тратить на это время.

Так же, я намеренно не разбивал на подкомпоненты Edge и Node чтобы не усложнять код.

Задачка
===

Нарисовать дерево

Из внешнего апи приходит дерево объектов в виде:

```js
[
    {id: 1, x: 100, y: 0, parent_id: null},
    {id: 2, x: 80, y: 10, parent_id: 1},
    {id: 3, x: 120, y: 10, parent_id: 1},
    {id: 4, x: 70, y: 20, parent_id: 2},
    {id: 5, x: 90, y: 20, parent_id: 2},
    {id: 6, x: 130, y: 20, parent_id: 3}
]
```

Нужно нарисовать в SVG это дерево реактом:
```
      1
     / \
    2   3
   /\    \
  4  5    6
```
Каждый объект — кружочек, их связи "потомок — наследник" рисуются линиями. 

По клику выделяем цветом кликнутый элемент и всех его потомков.

По клику выделяем цветом путь к корневому элементу.

Стейтменеджеры использовать нельзя.

Суть
===
Суть задачки в том как я буду без стейтменеджеров побеждать однонаправленный поток данных, распространяя изменение "вверх" по дереву.
