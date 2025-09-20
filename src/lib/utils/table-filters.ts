import { GlobalFilterFn } from '@/components/ui/data-table';
import { Business } from '@/lib/types/businesses';
import { AdminGetAllUsersUser, PendingUser } from '@/lib/types/users';
import { Tippee } from '@/lib/types/tippees';

// Business-specific global filter function
export const businessGlobalFilterFn: GlobalFilterFn<Business> = (row, columnId, value) => {
  const business = row.original;
  const searchValue = value.toLowerCase();

  // Search in legalName and brandName
  const legalName = business.legalName?.toLowerCase() || '';
  const brandName = business.brandName?.toLowerCase() || '';
  const businessType = business.businessType?.toLowerCase() || '';

  return (
    legalName.includes(searchValue) ||
    brandName.includes(searchValue) ||
    businessType.includes(searchValue)
  );
};

// User-specific global filter function
export const userGlobalFilterFn: GlobalFilterFn<AdminGetAllUsersUser> = (row, columnId, value) => {
  const user = row.original;
  const searchValue = value.toLowerCase();

  // Search in user fields
  const firstName = user.firstName?.toLowerCase() || '';
  const lastName = user.lastName?.toLowerCase() || '';
  const email = user.email?.toLowerCase() || '';
  const userName = user.userName?.toLowerCase() || '';
  const mobileNumber = user.mobileNumber?.toLowerCase() || '';

  // Search in user roles
  const roles = user.userRoles?.map(role => role.role.toLowerCase()).join(' ') || '';

  return (
    firstName.includes(searchValue) ||
    lastName.includes(searchValue) ||
    email.includes(searchValue) ||
    userName.includes(searchValue) ||
    mobileNumber.includes(searchValue) ||
    roles.includes(searchValue)
  );
};

// Pending user-specific global filter function
export const pendingUserGlobalFilterFn: GlobalFilterFn<PendingUser> = (row, columnId, value) => {
  const user = row.original;
  const searchValue = value.toLowerCase();

  // Search in user fields
  const firstName = user.firstName?.toLowerCase() || '';
  const lastName = user.lastName?.toLowerCase() || '';
  const email = user.email?.toLowerCase() || '';
  const userName = user.userName?.toLowerCase() || '';
  const mobileNumber = user.mobileNumber?.toLowerCase() || '';
  const countryCode = user.countryCode?.toLowerCase() || '';

  // Search in user roles
  const roles = user.userRoles?.map(role => role.role.toLowerCase()).join(' ') || '';

  return (
    firstName.includes(searchValue) ||
    lastName.includes(searchValue) ||
    email.includes(searchValue) ||
    userName.includes(searchValue) ||
    mobileNumber.includes(searchValue) ||
    countryCode.includes(searchValue) ||
    roles.includes(searchValue)
  );
};

// Tippee-specific global filter function
export const tippeeGlobalFilterFn: GlobalFilterFn<Tippee> = (row, columnId, value) => {
  const tippee = row.original;
  const searchValue = value.toLowerCase();

  // Search in tippee fields
  const firstName = tippee.firstName?.toLowerCase() || '';
  const lastName = tippee.lastName?.toLowerCase() || '';
  const email = tippee.email?.toLowerCase() || '';
  const mobileNumber = tippee.mobileNumber?.toLowerCase() || '';
  const userName = tippee.userName?.toLowerCase() || '';

  return (
    firstName.includes(searchValue) ||
    lastName.includes(searchValue) ||
    email.includes(searchValue) ||
    mobileNumber.includes(searchValue) ||
    userName.includes(searchValue)
  );
};
