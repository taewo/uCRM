import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const propTypes = {
};

const defaultProps = {
};

class Members extends Component {
  render() {
    const memberProfiles = ['a', 'b', 'c'];
    return (
      <div>
        <Link to={'/admin/manage/members/add'}>
          Add Member
        </Link>
        <br />
        {memberProfiles}
      </div>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

Members.propTypes = propTypes;
Members.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Members);
