interface SanityBody {
    _createdAt: string;
    _id: string;
    _rev: string;
    _updatedAt: string;
}

interface Image {
    _type: "image";
    asset: {
        _ref: string;
        _type: "reference";
    };
};

interface File {
    _type: "file";
    asset: {
        _ref: string;
        _type: "reference";
    };
};

export interface HeadInfo extends SanityBody {
    _type: "headInfo";
    name: string;
    image: Image;
    description: string;
};


export interface Publication{
    title: string;
    year: string;
    publication: string;
    citation: string;
    authors: string;
    url: string;
};

export interface Member extends SanityBody {
    _type: "team";
    name: string;
    role: string;
    alumni: boolean;
    image: Image;
    website: string;
    linkedin: string;
    email: string;
    password: string;
};

export interface Post extends SanityBody {
    _type: "posts";
    title: string;
    user: string;
    description: string;
    image: Image;
    options: {
        hotspot: true,
    },
}

export interface Project extends SanityBody {
    _type: "projects";
    title: string;
    user: string;
    description: string;
    link: string;
    image: Image;
    options: {
        hotspot: true,
    },
}

export interface Service extends SanityBody {
    _type: "services";
    type: string;
    title: string;
    publisher: string;
    year: string;
    location: string;
    committee: string;
}

export interface Teaching extends SanityBody {
    _type: "teaching";
    title: string;
    description: string;
}