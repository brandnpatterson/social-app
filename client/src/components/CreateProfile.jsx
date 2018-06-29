import React from 'react';
import { withRouter } from 'react-router-dom';
import { object } from 'prop-types';
import InputGroup from './templates/InputGroup';
import SelectListGroup from './templates/SelectListGroup';
import TextFieldGroup from './templates/TextFieldGroup';
import TextAreaFieldGroup from './templates/TextAreaFieldGroup';

// Redux
import { connect } from 'react-redux';
import { createProfile } from '../actions/profileActions';

const propTypes = {
  errors: object.isRequired,
  profile: object.isRequired
};

class CreateProfile extends React.Component {
  state = {
    bio: '',
    company: '',
    displaySocialInputs: false,
    errors: {},
    facebook: '',
    githubusername: '',
    handle: '',
    instagram: '',
    linkedin: '',
    location: '',
    skills: '',
    status: '',
    twitter: '',
    website: '',
    youtube: ''
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const profileData = {
      bio: this.state.bio,
      company: this.state.company,
      facebook: this.state.facebook,
      githubusername: this.state.githubusername,
      handle: this.state.handle,
      instagram: this.state.instagram,
      linkedin: this.state.linkedin,
      location: this.state.location,
      skills: this.state.skills,
      status: this.state.status,
      twitter: this.state.twitter,
      website: this.state.website,
      youtube: this.state.youtube
    };

    this.props.createProfile(profileData, this.props.history);
  };

  render() {
    const { displaySocialInputs, errors } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            error={errors.twitter}
            icon="fab fa-twitter"
            onChange={this.onChange}
            name="twitter"
            placeholder="Twitter Profile URL"
            value={this.state.twitter}
          />
          <InputGroup
            error={errors.facebook}
            icon="fab fa-facebook"
            onChange={this.onChange}
            name="facebook"
            placeholder="Facebook Profile URL"
            value={this.state.facebook}
          />
          <InputGroup
            error={errors.linkedin}
            icon="fab fa-linkedin"
            onChange={this.onChange}
            name="linkedin"
            placeholder="Linkedin Profile URL"
            value={this.state.linkedin}
          />
          <InputGroup
            error={errors.youtube}
            icon="fab fa-youtube"
            onChange={this.onChange}
            name="youtube"
            placeholder="Youtube Profile URL"
            value={this.state.youtube}
          />
          <InputGroup
            error={errors.instagram}
            icon="fab fa-instagram"
            onChange={this.onChange}
            name="instagram"
            placeholder="Instagram Profile URL"
            value={this.state.instagram}
          />
        </div>
      );
    }

    // Select options for Status
    const options = [
      { label: '* Select a Professional Status', value: 0 },
      { label: 'Developer', value: 'Developer' },
      { label: 'Junior Developer', value: 'Junior Developer' },
      { label: 'Senior Developer', value: 'Senior Developer' },
      { label: 'Manager', value: 'Manager' },
      { label: 'Student', value: 'Student' },
      { label: 'Instructor', value: 'Instructor' },
      { label: 'Other', value: 'Other' }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-for text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname"
                  name="handle"
                  onChange={this.onChange}
                  placeholder="* Profile Handle"
                  value={this.state.handle}
                />
                <SelectListGroup
                  error={errors.status}
                  info="Give us an idea of where you are at in your career"
                  name="status"
                  options={options}
                  onChange={this.onChange}
                  placeholder="Status"
                  value={this.state.status}
                />
                <TextFieldGroup
                  error={errors.company}
                  info="Could be your own company or one you work for"
                  name="company"
                  onChange={this.onChange}
                  placeholder="Company"
                  value={this.state.company}
                />
                <TextFieldGroup
                  error={errors.website}
                  info="Could be your own website or a company one"
                  name="website"
                  onChange={this.onChange}
                  placeholder="Website"
                  value={this.state.website}
                />
                <TextFieldGroup
                  error={errors.location}
                  info="City or city & state suggested (eg. Boston, MA)"
                  name="location"
                  onChange={this.onChange}
                  placeholder="Location"
                  value={this.state.location}
                />
                <TextFieldGroup
                  error={errors.skills}
                  info="Please use comma seperated values (eg. HTML, CSS, JavaScript, PHP"
                  name="skills"
                  onChange={this.onChange}
                  placeholder="* Skills"
                  value={this.state.skills}
                />
                <TextFieldGroup
                  error={errors.githubusername}
                  info="If you want your latest repos and Github link, include your username"
                  name="githubusername"
                  onChange={this.onChange}
                  placeholder="Github Username"
                  value={this.state.githubusername}
                />
                <TextAreaFieldGroup
                  error={errors.bio}
                  info="Tell us a little about yourself"
                  name="bio"
                  onChange={this.onChange}
                  placeholder="Short Bio"
                  value={this.state.bio}
                />
                <div className="mb-3">
                  <button
                    className="btn btn-light"
                    onClick={() => {
                      this.setState(previousState => ({
                        displaySocialInputs: !previousState.displaySocialInputs
                      }));
                    }}
                    type="button"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input
                  className="btn btn-info btn-block mt-4"
                  type="submit"
                  value="Submit"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = propTypes;

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
