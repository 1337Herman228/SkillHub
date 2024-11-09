import { IResources } from "@/interfaces/types";

export const mapResources = (resources: IResources[]) => {
    const defaultResourcesNames = resources.map((resource) => {
        return { value: resource.resourceTitle };
    });

    const defaultResourcesLinks = resources.map((resource) => {
        return { value: resource.resourceLink };
    });

    return { defaultResourcesNames, defaultResourcesLinks };
};
