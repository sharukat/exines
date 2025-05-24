from flask import Flask
from scholarly import scholarly
import json
app = Flask(__name__)


def save_publications(publications):
    """Save the publications to a JSON file."""
    with open('../../lib/publications.json', 'w') as file:
        json.dump(publications, file, indent=4)


@app.route('/api/publications', methods=['GET'])
def get_scholarly_publications():

    all_publication = []
    author = scholarly.search_author_id('uSWqDhwAAAAJ')
    author = scholarly.fill(author)
    publication = author["publications"]

    for pub in publication:
        filled_pub = scholarly.fill(pub)
        pub_dict = {
            'title': filled_pub['bib']['title'],
            'year': filled_pub['bib'].get('pub_year', 'Year Unknown'),
            'url': filled_pub.get('pub_url', '#'),
            'authors': filled_pub['bib'].get('author', []),
            'citation': filled_pub['bib'].get('citation', 'Citation Unknown'),
        }
        all_publication.append(pub_dict)
    result = {'publications': all_publication}
    save_publications(result)
    return result


if __name__ == '__main__':
    app.run(port=5328)
