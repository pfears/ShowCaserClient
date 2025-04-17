export interface IAthlete {
    id: number;
    firstname: string;
    lastname: string;
    bio: string;
    profile_medium: string;
    profile: string;
    city: string;
    state: string;
    country: string;
    sex: 'M' | 'F';
  }
  
  export class Athlete implements IAthlete {
    id: number;
    firstname: string;
    lastname: string;
    bio : string;
    profile_medium: string;
    profile: string;
    city: string;
    state: string;
    country: string;
    sex: 'M' | 'F';
  
    constructor(data: any) { // Putting Any here since strava has way more data points than I want
      this.id = data.id;
      this.firstname = data.firstname;
      this.lastname = data.lastname;
      this.bio = data.bio;
      this.profile_medium = data.profile_medium;
      this.profile = data.profile;
      this.city = data.city;
      this.state = data.state;
      this.country = data.country;
      this.sex = data.sex;
    }
}