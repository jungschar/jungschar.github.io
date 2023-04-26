# this script creates a sitemap.xml file for the website
# it uses spiele/index.json to get the list of games

import json

if __name__ == '__main__':

    #  load the list of games
    with open('spiele/index.json', 'r') as f:
        games = json.load(f)['spiele']
    url_list = [g['url'] for g in games]
    print(f'Found {len(url_list)} games')

    #  create the sitemap.xml file
    with open('sitemap.xml', 'w') as f:
        f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
        f.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')
        for url in url_list:
            f.write(f'<url><loc>https://www.spiele-mit-uns.ch{url}</loc></url>\n')
        f.write('</urlset>\n')
    print('sitemap.xml created')
 