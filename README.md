using this branch to deploy into vercel
Implememntation of my Memories app


Need fixes.
## Like button
First like after a refresh (currently no limit for like) is not reflecting on view

added a async await in handleLike seems it sorted

## Updates
changes to post/memory not reflecting always on the view
DEleting was not updating. solution removed dispath(getPosts()) inside handleDelete function

## Lastly
i have three branchs in my local project
main
part1
part2

main and part1 is having no difference

part 2 is with login auth.

part 3 is current with pagination and search https://www.youtube.com/watch?v=LYWgPSbPDfQ

part 4 is this branch trying to implement 'comment section'

### features in part4:
    single post view on click
    recommended posts

## last Comment
Search with tags or keywork not fetching correctly,
can't edit post once login without refresh getting 'jwt malformed' in server conosle
