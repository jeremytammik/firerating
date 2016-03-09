# fireratingdb

fireratingdb is
a [Node](https://nodejs.org) web server driving
a [MongoDB](https://www.mongodb.org) database.

It interacts with
the [FireRatingCloud](https://github.com/jeremytammik/FireRatingCloud) Revit C# add-in, which is a REST client.

For more information, please refer to that repository.


## Installation

The simplest way to install fireratingdb is to host it on a public node.js hosting platform such
as [Heroku](http://heroku.com)
and set up the database on a MongoDB hosting platform such as [mongolab](https://mongolab.com).

The currently running sample installation does just that, and the links to the two
are [fireratingdb.herokuapp.com](http://fireratingdb.herokuapp.com)
and [mongolab.com/databases/firerating](https://mongolab.com/databases/firerating).

You can run either or both components locally on your own system as well, or anywhere else you like, in which case you need to install and
run [MongoDB](https://www.mongodb.org)
and/or [Node](https://nodejs.org) and
the fireratingdb app as needed.

Here is a button to immediately and fully automatically deploy and run this app on your Heroku account for you, creating a new free account for you on the fly if needed:

<a href="https://www.heroku.com/deploy/?template=https://github.com/jeremytammik/firerating">
  <img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy">
</a>


## Author

Jeremy Tammik,
[The Building Coder](http://thebuildingcoder.typepad.com) and
[The 3D Web Coder](http://the3dwebcoder.typepad.com),
[ADN](http://www.autodesk.com/adn)
[Open](http://www.autodesk.com/adnopen),
[Autodesk Inc.](http://www.autodesk.com)


## License

This sample is licensed under the terms of the [MIT License](http://opensource.org/licenses/MIT).
Please see the [LICENSE](LICENSE) file for full details.
