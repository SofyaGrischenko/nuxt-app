import type { Cv, CvApi } from '~/types/cv.types';
import type {
  UpdateProfileInput,
  User,
  UserApi,
  UserProfileApi,
} from '~/types/user.types';

const mapApiToProfile = (profile: UserProfileApi) => {
  return {
    // id: profile.id,
    firstName: profile.first_name ?? '',
    lastName: profile.last_name ?? '',
    avatar: profile.avatar ?? '',
  };
};

export const mapApiToUser = (user: UserApi): User => {
  return {
    id: user.id,
    createdAt: user.created_at,
    email: user.email,
    departmentName: user.department_name,
    positionName: user.position_name,
    role: user.role,
    //remove undefined
    profile: user.profile ? mapApiToProfile(user.profile) : undefined,
  };
};

export const mapProfile = (user: UpdateProfileInput) => {
  return {
    userId: user.userId,
    first_name: user.firstName,
    last_name: user.lastName,
  };
};

export const mapApiToCv = (cvFromApi: CvApi): Cv => {
  return {
    id: cvFromApi.id,
    createdAt: cvFromApi.created_at,
    name: cvFromApi.name,
    description: cvFromApi.description,
    education: cvFromApi.education,
    user: mapApiToUser(cvFromApi.user),
    // projects: cvFromApi.projects.map(mapApiToProject),
    projects: cvFromApi.projects,
    skills: cvFromApi.skills,
    languages: cvFromApi.languages,
  };
};
