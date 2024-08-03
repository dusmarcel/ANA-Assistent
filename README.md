<div align="center">

  <h1><code>ANA Assistent</code></h1>

</div>

## About

Kleines Tool, das dabei hilft, die redaktionellen Vorgaben für Artikel in der [ANA-ZAR](https://dav-migrationsrecht.de/de/ana-zar) einzuhalten. Die ANA-ZAR sind die „Anwaltsnachrichten in der Zeitrschrift für Ausländerrecht und Ausländerpolitik“. Es handelt sich um Mitgliederzeitschrift der Arbeitsgemeinschaft Ausländerrecht im Deutschen Anwaltverein, die als Beilage in der ZAR in einer Printfassung und zudem auch frei zugänglich online als PDF-Datei veröffentlicht wird.

## Installation

Benötigt werden ein Webserver mit funktionsfähigem PHP. Um die Abhängigkeiten zu installieren, ist ein

```console
composer update
````

auszuführen. Falls php nicht auf composer zugreifen können sollte, weil es nicht in open_basedir enthalten sein sollte, hilft möglicherweise:

```console
php -d open_basedir="" /usr/bin/composer install
```

## License

Licensed under either of

* Apache License, Version 2.0, ([LICENSE-APACHE](LICENSE-APACHE) or http://www.apache.org/licenses/LICENSE-2.0)
* MIT license ([LICENSE-MIT](LICENSE-MIT) or http://opensource.org/licenses/MIT)

at your option.

### Contribution

Unless you explicitly state otherwise, any contribution intentionally
submitted for inclusion in the work by you, as defined in the Apache-2.0
license, shall be dual licensed as above, without any additional terms or
conditions.
