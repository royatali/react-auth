export type AllowedRoles = "ADMIN" | "USER";
export enum UserRoles {
  ADMIN = "ADMIN",
  USER = "USER",
}

export type RoleDto = {
  name: UserRoles;
  _id: string;
};

export type RoleResponseDto = {
  role: RoleDto;
};

export type AllRolesResponseDto = {
  roles: RoleDto[];
};

export type PaginatedRolesResponseDto = {
  currentPage: number;
  roles: RoleDto[];
  totalPages: number;
  totalRoles: number;
};
