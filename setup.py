#!/usr/bin/env python

import os
import sys
import glob
from distutils.core import setup
from distutils.command.install import install
import trac

PACKAGE = 'Trac'
VERSION = str(trac.__version__)
URL = trac.__url__
LICENSE = trac.__license__


class my_install (install):
     def run (self):
         self.siteconfig()

     def siteconfig(self):
         templates_dir = os.path.join(self.prefix, 'share/trac/templates')
         htdocs_dir = os.path.join(self.prefix, 'share/trac/htdocs')
         wiki_dir = os.path.join(self.prefix, 'share/trac/wiki-default')

         f = open('trac/siteconfig.py','w')
         f.write("""
# PLEASE DO NOT EDIT THIS FILE!
# This file was autogenerated when installing %(trac)s %(ver)s.
#
__default_templates_dir__ = '%(templates)s'
__default_htdocs_dir__ = '%(htdocs)s'
__default_wiki_dir__ = '%(wiki)s'

""" % {'trac':PACKAGE, 'ver':VERSION, 'templates':templates_dir,
       'htdocs':htdocs_dir, 'wiki':wiki_dir})
         f.close()

         # Run actual install
         install.run(self)

         print
         print "Thank you for choosing Trac %s. Enjoy your stay!" % VERSION
         print trac.__credits__


     
setup(name="trac",
      description="Trac - Wiki-based issue tracker and project environment",
      version=VERSION,
      author="Edgewall Research & Development",
      author_email="info@edgewall.com",
      license=LICENSE,
      url=URL,
      packages=['trac'],
      data_files=[('share/trac/templates', glob.glob('templates/*')),
                  ('share/trac/htdocs', glob.glob('htdocs/*')),
                  ('share/trac/wiki-default', glob.glob('wiki-default/*'))],
      scripts=[os.path.join('scripts', 'trac-admin')],
      cmdclass = {'install': my_install})



