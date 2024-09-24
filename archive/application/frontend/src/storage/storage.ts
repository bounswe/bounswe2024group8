import { SearchResultProps, ProfileProps } from "../interfaces/postInterface";

export const searchResult: SearchResultProps = {
  team: {
    teamName: "",
    logoUrl: "",
    year: 0,
    coachName: "",
  },
  feedProps: {
    posts: [],
  },
};

export let loggedInProfileInfo: ProfileProps = {
  email: "",
  firstName: "",
  lastName: "",
  community: {
    id: 0,
    name: "",
    description: "",
    team: "",
    fanaticCount: 0,
  },
  profilePicture: null,
  accountNonExpired: false,
  accountNonLocked: false,
  credentialsNonExpired: false,
};

export const setLoggedInProfileInfo = (
  newProfileInfo: Partial<ProfileProps>
) => {
  loggedInProfileInfo = { ...loggedInProfileInfo, ...newProfileInfo };
};
