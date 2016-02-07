require 'rack/jekyll'
require 'yaml'
require 'bundler/setup'
require 'rack/rewrite'

# The project root directory
$root = ::File.dirname(__FILE__)

use Rack::Rewrite do
  r301 %r{.*}, 'http://dombarnes.com$&', :if => Proc.new 
  {|rack_env| rack_env['SERVER_NAME'] != 'dombarnes.com' }
end

run Rack::Jekyll.new
