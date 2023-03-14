# Jungschar Wiki (jungschar.github.io)
[Hier](https://jungschar.github.io/) findest Du alle dokumentierten Jungschar Spiele
und kannst ganz einfach danach suchen.

## Dokumentierte Spiele
- Stratego
- Fahne klauen
- Catch the color
- Tag der Erfinder
- A kaputt

## Wie man ein Spiel hinzufügt
1. Eintrag in `docs/spiele/index.json` hinzufügen. Folgende Felder müssen eingetragen werden:
 - `name`: Anzeigename des Spiels (Leerzeichen und sonstige Sonderzeichen erlaubt, aber kein `"`)
 - `url`: Dieser Text darf nur als kleinen Buchstaben, Zahlen und Bindestrichen bestehen ohne sonstige Sonderzeichen
 - `kurzbeschreibung`: Eine sehr kurze Beschreibung, zur Wiedererkennung des Spiels (ca. 3 Sätze)
 - `wetter`: Mögliche Werte: `draussen`, `drinnen`, `egal`
 - `helligkeit`: Mögliche Werte: `hell`, `dunkel`, `egal`
 - `anz_ma`: Anzahl Mitarbeiter; Mögliche Werte: `wenig`, `normal`, `viel`
 - `anz_kinder`: Anzahl Kinder; Mögliche Werte: `wenig`, `normal`, `viel`
 - `suchbegriffe`: Dieses Feld ist ein JSON-Array aus Strings und sollte ähnliche Begriffe zu vereinfachten Suche enthalten
2. Ordner in `docs/spiele/` erstellen mit dem gleichen Namen wie das `url`-Feld in der `docs/spiele/index.json`
3. Die Datei `index.md` in `docs/spiele/<url>/` erstellen und alle Infos über das Spiel in [Markdown](https://docs.github.com/de/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) verfassen. [Hier](https://github.com/adamvleggett/drawdown) stehen alle unterstützen funktionen von Markown.
4. Das Python-Skript `docs/copy_game_index_to_all_games.py` ausführen
5. In dieser `README.md` unter "Dokumentierte Spiele" das Spiel hinzufügen
6. Commit und Push 😀
