Package.describe({
  name: 'dhavalrajani:customcssload',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  //api.addFiles('css/responsive.dataTables.min.css','client');
  //api.addFiles('css/select.dataTables.css','client');
  api.addFiles('css/custom_style.css','client');
  api.addFiles('css/_dmaterial-global.css','client');
  api.addFiles('css/buttons.css','client');
  api.addFiles('css/media.css','client');
  api.addFiles('css/navbar.css','client');
  api.addFiles('css/nav.css','client');
  api.addFiles('css/_sidebar-final.css','client');
  api.addFiles('css/blue.css','client');
  api.addFiles('css/card.css','client');
  //api.addFiles('css/ddata-table.css','client');

  if (typeof api.addAssets === 'function') {
    api.addAssets([
      'images/arrow_drop_down-white.svg',
      'images/arrow_drop_down.svg'
    ], 'client');
  }else {
    api.addFiles([
      'images/arrow_drop_down-white.svg',
      'images/arrow_drop_down.svg'
    ], 'client');
  }


});
