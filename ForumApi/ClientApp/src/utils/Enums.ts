export enum HomePageTab{
    RECOMMENDED,
    ALL,
    UNANSWERED
}

export enum PostType{
    QUESTION="Q",
    ANSWER="A",
    COMMENT="C"
}

export enum CashedItem{
    USER_COMMENT="userComment",
    VIEWS="views"
}

export enum PostStatus{
    ACCEPTED="acceptedAnswer",
    UNACCEPTED="unacceptedAnswer"
}

export enum SideBar{
    NONE=-1,
    POPUP=-2,
    MAIN_PAGE=0,
    EQUATION=1,
    TAGS=2,
    USERS=3
}

export enum SidebarDisplay{
    POPUP=1,
    NONE=2,
    NORMAL=3
}

export enum SideBarMode{
    POPUP = 1,
    NORMAL = 2
}

export enum Badge{
    PLATINUM=200,
    GOLD=100,
    SILVER=50
}
